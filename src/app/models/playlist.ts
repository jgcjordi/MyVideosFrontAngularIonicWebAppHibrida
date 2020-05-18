export interface Playlist {
    id?: string;
    title: string;
    description: string;
    thumbnail?: {
        url: string;
        width: number;
        height: number;
    }
    date?: number;
    count?: number; // número de vídeos en la lista de reproducción
    videosIds?: string[];
}