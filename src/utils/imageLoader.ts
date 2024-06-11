import { ImageLoaderProps } from 'next/image';

/**
 * Generates a URL for an image with the given properties.
 *
 * @param {ImageLoaderProps} props - The properties of the image.
 * @return {string} The URL of the image.
 */

function imageLoader(props: ImageLoaderProps) {
  return `${props.src}${props.src.includes('?') ? '&' : '?'}org_if_sml=1&w=${props.width}${
    props.quality ? '&q=' + props.quality : '&q=90'
  }`;
}

export default imageLoader;
