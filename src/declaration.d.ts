declare module "*.mp4" {
  const src: string;
  export default src;
}

declare interface ImportMeta {
  readonly env: any;
}
