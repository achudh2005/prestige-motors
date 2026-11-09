'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Trash2, Camera, Video, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function NewVehiclePage() {
  const router = useRouter();

  // Basic Info
  const [vin, setVin] = useState('');
  const [make, setMake] = useState('Porsche');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [year, setYear] = useState(2024);
  const [price, setPrice] = useState(250000);
  const [mileage, setMileage] = useState(1200);
  const [condition, setCondition] = useState('cpo');
  const [bodyType, setBodyType] = useState('Coupe');

  // Specs
  const [engine, setEngine] = useState('4.0L Naturally Aspirated Boxer-6');
  const [powerHp, setPowerHp] = useState(502);
  const [torqueNm, setTorqueNm] = useState(470);
  const [acceleration, setAcceleration] = useState(3.4);
  const [topSpeed, setTopSpeed] = useState(318);
  const [transmission, setTransmission] = useState('Dual-Clutch PDK');
  const [drivetrain, setDrivetrain] = useState('RWD');
  const [color, setColor] = useState('Arctic Grey');
  const [interiorColor, setInteriorColor] = useState('Black Leather & Alcantara');

  // Images with reordering
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Video Tour
  const [videoUrl, setVideoUrl] = useState('');

  // Features list
  const [features, setFeatures] = useState<string[]>([
    'Ceramic Composite Brakes (PCCB)',
    'Front Axle Lift System',
    'Carbon Bucket Seats'
  ]);
  const [newFeature, setNewFeature] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMoveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const item = updated.splice(from, 1)[0];
    updated.splice(to, 0, item);
    setImages(updated);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Vehicle listing "${year} ${make} ${model}" created and added to showroom inventory!`);
    router.push('/admin/inventory');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inventory"
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
              Add Luxury Motorcar Listing
            </h1>
            <p className="text-xs text-zinc-500">
              Input detailed mechanical specifications, telemetry, and media assets.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Core Details */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
            1. Identification & Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="VIN (17 characters)"
              required
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="WP0AF2A97NS298..."
            />
            <Input
              label="Make / Marque"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <Input
              label="Model"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="911 GT3 or Roma"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              label="Trim / Special Package"
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
              placeholder="Weissach or Touring"
            />
            <Input
              label="Model Year"
              type="number"
              required
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <Input
              label="Showroom Price ($)"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Input
              label="Odometer (Miles)"
              type="number"
              required
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Section 2: Mechanical Specifications */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
            2. Powertrain & Telemetry Specs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Engine Architecture"
              required
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
            <Input
              label="Horsepower (HP)"
              type="number"
              required
              value={powerHp}
              onChange={(e) => setPowerHp(Number(e.target.value))}
            />
            <Input
              label="Torque (Nm)"
              type="number"
              required
              value={torqueNm}
              onChange={(e) => setTorqueNm(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              label="0-100 km/h (Seconds)"
              type="number"
              step="0.1"
              required
              value={acceleration}
              onChange={(e) => setAcceleration(Number(e.target.value))}
            />
            <Input
              label="Top Speed (km/h)"
              type="number"
              required
              value={topSpeed}
              onChange={(e) => setTopSpeed(Number(e.target.value))}
            />
            <Input
              label="Transmission"
              required
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            />
            <Input
              label="Drivetrain"
              required
              value={drivetrain}
              onChange={(e) => setDrivetrain(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Exterior Paint Finish"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Input
              label="Interior Leather / Finish"
              required
              value={interiorColor}
              onChange={(e) => setInteriorColor(e.target.value)}
            />
          </div>
        </div>

        {/* Section 3: Media & Photo Reordering */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
            3. Photography & Media Assets (Drag/Reorder)
          </h3>

          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL (https://...)"
              className="flex-grow px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs"
            />
            <Button type="button" variant="outline" size="sm" onClick={handleAddImage}>
              <Plus className="w-4 h-4 mr-1" />
              Add Image
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative group rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-zinc-900 aspect-[16/10]">
                <img src={img} alt="Vehicle upload" className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  #{i + 1} {i === 0 ? '(Hero)' : ''}
                </div>
                <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(i, i - 1)}
                      className="p-1 bg-black/70 text-white rounded text-[10px] hover:bg-black"
                    >
                      &larr;
                    </button>
                  )}
                  {i < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(i, i + 1)}
                      className="p-1 bg-black/70 text-white rounded text-[10px] hover:bg-black"
                    >
                      &rarr;
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="p-1 bg-red-600/80 text-white rounded text-[10px] hover:bg-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Features List */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
            4. Bespoke Equipment & Options
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="e.g. Burmester High-End 3D Surround Sound"
              className="flex-grow px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs"
            />
            <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map((feat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(i)}
                  className="hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link href="/admin/inventory">
            <Button variant="outline" size="md">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="gold" size="md">
            Publish Allocation to Showroom
          </Button>
        </div>
      </form>
    </div>
  );
}
