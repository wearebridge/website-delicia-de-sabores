'use client'

import React from 'react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import ProductDetails from './ProductDetails';

export const dynamic = "force-dynamic";

async function fetchImageUrl(imageId: string): Promise<string> {
  const imageFetch = await fetch(`/api/media/${imageId}`);
  const response = await imageFetch.json();
  return response.url;
}


function ProductCard({ product }: { product: any }) {
  const [imageUrl, setImageUrl] = React.useState('/assets/placeholder.png');

  React.useEffect(() => {
    async function loadImage() {

      const baseURL = process.env.URL || 'https://delicia-de-sabores.vercel.app';

      if (product.image?.id) {
        const fetchedUrl = await fetchImageUrl(product.image.id);
        setImageUrl(`${baseURL}${fetchedUrl}`);
      }
    }
    loadImage();
  }, [product.image]);

  return (
    <Card>
      <CardContent className="flex flex-col aspect-square justify-center p-3 md:p-6">
        <div className="min-h-48 h-full md:max-h-80 w-full relative mx-auto">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-center object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-left text-xl font-medium">{product.name}</p>
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">R$ {product.price.toFixed(2)}</div>
            <ProductDetails product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
