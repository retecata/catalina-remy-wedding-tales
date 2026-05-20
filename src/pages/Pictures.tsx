import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Download, Trash2, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Photo {
  id: string;
  uploader_name: string | null;
  url: string;
  created_at: string;
}

const Pictures = () => {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [revealAt, setRevealAt] = useState<Date | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [countdown, setCountdown] = useState('');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('list-photos');
    if (error) {
      toast.error('Could not load gallery');
      setLoading(false);
      return;
    }
    setRevealed(data.revealed);
    setRevealAt(new Date(data.revealAt));
    setPhotos(data.photos || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!revealAt || revealed) return;
    const tick = () => {
      const diff = revealAt.getTime() - Date.now();
      if (diff <= 0) {
        load();
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [revealAt, revealed]);

  const handleDelete = async (id: string) => {
    const code = prompt('Enter moderator code to delete this photo:');
    if (!code) return;
    const { data, error } = await supabase.functions.invoke('delete-photo', {
      body: { id, code },
    });
    if (error || !data?.success) {
      toast.error(data?.error || 'Could not delete');
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setLightbox(null);
    toast.success('Deleted');
  };

  const handleDownload = async (photo: Photo) => {
    try {
      const res = await fetch(photo.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `catremy-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Download failed');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <Heart className="w-4 h-4" /> Cătălina & Remy
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl mb-3">The Gallery</h1>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground py-20 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading…
          </div>
        ) : !revealed ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The gallery unlocks at midnight after the Netherlands celebration. Come back then to relive the night through everyone's eyes.
            </p>
            <div className="font-serif text-4xl md:text-6xl tracking-wide">{countdown || '…'}</div>
            <p className="text-xs text-muted-foreground mt-4">
              Reveal: {revealAt?.toLocaleString()}
            </p>
          </div>
        ) : photos.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">No photos yet.</p>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">{photos.length} memories from our guests 💛</p>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {photos.map((p) => (
                <div key={p.id} className="break-inside-avoid relative group rounded-lg overflow-hidden">
                  <img
                    src={p.url}
                    alt={p.uploader_name ? `By ${p.uploader_name}` : 'Guest photo'}
                    loading="lazy"
                    onClick={() => setLightbox(p)}
                    className="w-full cursor-pointer hover:opacity-90 transition"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <span className="text-xs text-white truncate">
                      {p.uploader_name || ''}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(p); }}
                        className="p-1.5 rounded bg-white/90 hover:bg-white"
                        aria-label="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                        className="p-1.5 rounded bg-white/90 hover:bg-white"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox.url}
            alt=""
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleDownload(lightbox); }}
              className="px-4 py-2 bg-white text-black rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(lightbox.id); }}
              className="px-4 py-2 bg-white/90 text-black rounded-lg flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pictures;