import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Loader2, Check, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UploadedPhoto {
  id: string;
  url: string;
}

const Upload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    let successes = 0;

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 10MB`);
        continue;
      }
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from('wedding-photos-nl')
        .upload(path, file, { contentType: file.type, upsert: false });

      if (upErr) {
        toast.error(`Upload failed: ${upErr.message}`);
        continue;
      }

      // Note: no .select() because the photos table has no SELECT policy for anon.
      const { error: dbErr } = await supabase
        .from('photos')
        .insert({
          event: 'netherlands',
          uploader_name: name.trim() || null,
          description: description.trim() || null,
          storage_path: path,
        });

      if (dbErr) {
        toast.error('Could not save photo');
        // Clean up the orphan file so it doesn't sit in storage without a DB row.
        await supabase.storage.from('wedding-photos-nl').remove([path]);
        continue;
      }

      const { data: pub } = supabase.storage
        .from('wedding-photos-nl')
        .getPublicUrl(path);

      setUploaded((prev) => [{ id: path, url: pub.publicUrl }, ...prev]);
      successes++;
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (successes > 0) {
      toast.success('Thanks for sharing! 💛');
      setDescription('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-5 py-10">
      <div className="max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <Heart className="w-4 h-4" /> Cătălina & Remy
        </Link>

        <h1 className="font-serif text-4xl mb-3">Share the moment</h1>
        <p className="text-muted-foreground mb-8">
          Snap a photo from tonight — it'll join the surprise gallery we unveil at midnight.
        </p>

        <label className="block text-sm font-medium mb-2">Your name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Anna"
          className="w-full px-4 py-3 rounded-lg border border-input bg-background mb-4"
        />

        <label className="block text-sm font-medium mb-2">Caption (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A little note about this moment…"
          rows={2}
          maxLength={240}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background mb-6 resize-none"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-5 rounded-xl text-lg font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" /> Uploading…
            </>
          ) : (
            <>
              <Camera className="w-6 h-6" /> Take Photo
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Photos up to 10MB · auto-uploaded · revealed Sep 6 at midnight
        </p>

        {uploaded.length > 0 && (
          <div className="mt-10">
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> Uploaded ({uploaded.length})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {uploaded.map((p) => (
                <img
                  key={p.id}
                  src={p.url}
                  alt="Just uploaded"
                  className="aspect-square object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;