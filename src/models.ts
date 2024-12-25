export interface IconProps {
  size?: number;
  color?: string;
  active?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number | string;
  description: string;
  sizes: string[] | number[];
  images: string[];
  path: string; //main image
  video?: string;
}
