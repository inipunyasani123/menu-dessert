import Image from 'next/image';
import manifest from '@/image-manifest.json';

// Foto asli item menu (public/images/menu/<id>.jpg, varian WebP dari scripts/static-images.mjs).
// Item yang belum punya foto memakai cadangan (ilustrasi SVG) lewat `children`.
export const fotoMenu = (id) => `/images/menu/${id}.jpg`;
export const adaFoto = (id) => Boolean(manifest[fotoMenu(id)]);

export default function FotoMenu({ id, alt = '', sizes = '200px', priority = false, className = '', children = null }) {
  if (!adaFoto(id)) return children;
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <Image src={fotoMenu(id)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
