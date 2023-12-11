const base64ToDataUrl = (base64: string): string => {
    return `data:application/pdf;base64,${base64}`;
}

export const openPdfWindow = (base64: string) => {
    const dataUrl = base64ToDataUrl(base64);
    window.open(dataUrl, '_blank');
}