/**
 * Preview launcher feature.
 * Opens preview URLs from apps/web to see live changes.
 */
export function openPreview(componentType: string, variant: string, props?: Record<string, any>) {
  const params = new URLSearchParams({
    type: componentType,
    variant,
    ...(props && { props: JSON.stringify(props) }),
  });
  
  const previewUrl = `http://localhost:3000/preview?${params.toString()}`;
  window.open(previewUrl, '_blank');
}
