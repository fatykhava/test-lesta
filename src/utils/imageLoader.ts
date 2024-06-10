import { ImageLoaderProps } from 'next/image';

function imageLoader(props: ImageLoaderProps) {
  return `${props.src}?org_if_sml=1&w=${props.width}${
    props.quality ? '&q=' + props.quality : '&q=90'
  }`;
}

export default imageLoader;
