-- ==============================================================================
-- PRESTIGE LUXURY MOTORS - POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Dealership Locations
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hours JSONB NOT NULL DEFAULT '{"mon_fri": "9:00 AM - 7:00 PM", "sat": "10:00 AM - 6:00 PM", "sun": "Closed"}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Staff Profiles & Roles
CREATE TYPE staff_role AS ENUM ('admin', 'sales', 'service', 'marketing');

CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(30),
    role staff_role NOT NULL DEFAULT 'sales',
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Vehicle Inventory
CREATE TYPE vehicle_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE vehicle_condition AS ENUM ('new', 'cpo', 'pre_owned');

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vin VARCHAR(17) UNIQUE NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    trim VARCHAR(100),
    year INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    interior_color VARCHAR(50) NOT NULL,
    mileage INT NOT NULL DEFAULT 0,
    fuel_type VARCHAR(30) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    engine VARCHAR(100) NOT NULL,
    power_hp INT NOT NULL,
    torque_nm INT,
    acceleration_0_100 NUMERIC(3, 1),
    top_speed_kmh INT,
    body_type VARCHAR(50) NOT NULL,
    drivetrain VARCHAR(20) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    reservation_deposit NUMERIC(10, 2) DEFAULT 2500.00,
    status vehicle_status DEFAULT 'available',
    condition vehicle_condition NOT NULL,
    is_certified BOOLEAN DEFAULT FALSE,
    history_report_url TEXT,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Vehicle Images
CREATE TYPE image_type AS ENUM ('exterior', 'interior', 'detail', 'video');

CREATE TABLE vehicle_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    sort_order INT DEFAULT 0,
    type image_type DEFAULT 'exterior',
    alt_text VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Vehicle Features & Options
CREATE TABLE vehicle_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- 6. Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Leads CRM
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'closed', 'lost');
CREATE TYPE lead_source AS ENUM ('enquiry', 'test_drive', 'finance', 'trade_in', 'contact');

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    source lead_source NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    status lead_status DEFAULT 'new',
    assigned_to UUID REFERENCES staff(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Lead Activities Timeline
CREATE TYPE activity_type AS ENUM ('note', 'call', 'email', 'status_change', 'test_drive_booked');

CREATE TABLE lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    type activity_type NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Test Drives (Anti-Double-Booking Guard)
CREATE TYPE test_drive_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show');

CREATE TABLE test_drives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status test_drive_status DEFAULT 'scheduled',
    assigned_to UUID REFERENCES staff(id) ON DELETE SET NULL,
    reminder_sent_24h BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_vehicle_slot UNIQUE (vehicle_id, scheduled_at)
);

-- 10. Trade-In Appraisals
CREATE TYPE condition_rating AS ENUM ('excellent', 'very_good', 'good', 'fair');

CREATE TABLE trade_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    mileage INT NOT NULL,
    condition condition_rating NOT NULL,
    vin VARCHAR(17),
    estimate_low NUMERIC(10, 2),
    estimate_high NUMERIC(10, 2),
    photos TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Finance Applications (Encrypted Sensitive Data)
CREATE TYPE finance_status AS ENUM ('submitted', 'under_review', 'pre_approved', 'approved', 'declined');

CREATE TABLE finance_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    down_payment NUMERIC(12, 2) NOT NULL,
    term_months INT NOT NULL,
    interest_rate NUMERIC(4, 2) NOT NULL,
    monthly_payment NUMERIC(10, 2) NOT NULL,
    credit_score_range VARCHAR(30),
    encrypted_sensitive_data TEXT,
    status finance_status DEFAULT 'submitted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Deals & Sales
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    staff_id UUID REFERENCES staff(id),
    sale_price NUMERIC(12, 2) NOT NULL,
    trade_in_id UUID REFERENCES trade_ins(id) ON DELETE SET NULL,
    finance_id UUID REFERENCES finance_applications(id) ON DELETE SET NULL,
    delivered_at TIMESTAMPTZ,
    deposit_amount NUMERIC(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Blog Posts
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    author_id UUID REFERENCES staff(id),
    category VARCHAR(50) NOT NULL,
    cover_image TEXT,
    excerpt TEXT,
    body TEXT NOT NULL,
    status blog_status DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Customer Reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(100) NOT NULL,
    vehicle_model VARCHAR(100),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'approved',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Public can view catalog, locations, reviews, blog
CREATE POLICY "Public catalog view" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Public vehicle images view" ON vehicle_images FOR SELECT USING (true);
CREATE POLICY "Public vehicle features view" ON vehicle_features FOR SELECT USING (true);
CREATE POLICY "Public locations view" ON locations FOR SELECT USING (true);
CREATE POLICY "Public approved reviews view" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public published blog view" ON blog_posts FOR SELECT USING (status = 'published');

-- Public visitors can submit lead forms & book test drives
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert test_drives" ON test_drives FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert trade_ins" ON trade_ins FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert finance_applications" ON finance_applications FOR INSERT WITH CHECK (true);

-- Staff authenticated access policies
CREATE POLICY "Staff read leads" ON leads FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff update leads" ON leads FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage test_drives" ON test_drives FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage trade_ins" ON trade_ins FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage finance" ON finance_applications FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage catalog" ON vehicles FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage customers" ON customers FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff manage sales" ON sales FOR ALL USING (auth.uid() IS NOT NULL);
