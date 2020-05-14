export interface Video {
    id?: string;
    type: string; // tipo de vídeo: 'local', 'youtube'
    url: string; // URL donde reside el vídeo
    title: string;
    description?: string;
    thumbnail?: {
        url: string;
        width: number;
        height: number;
    };
    tags?: string;
    duration?: string;
    date?: string;
    width?: number;
    height?: number;
}