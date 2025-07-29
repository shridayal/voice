import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AudioUploadProps {
  label: string;
  file: File | null;
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  disabled?: boolean;
}

export const AudioUpload: React.FC<AudioUploadProps> = ({
  label,
  file,
  onFileUpload,
  onFileRemove,
  disabled = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !disabled) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload, disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg', '.flac']
    },
    multiple: false,
    disabled
  });

  const handlePlayPause = () => {
    if (!file) return;

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(URL.createObjectURL(file));
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{label}</h3>
      
      {!file ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-300 ease-smooth
            ${isDragActive 
              ? 'border-primary bg-gradient-audio animate-pulse-glow' 
              : 'border-border hover:border-primary/50 hover:bg-gradient-audio/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-foreground font-medium mb-2">
            {isDragActive ? 'Drop your audio file here' : 'Upload audio file'}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports MP3, WAV, M4A, OGG, FLAC
          </p>
        </div>
      ) : (
        <div className="bg-gradient-audio rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="w-8 h-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onFileRemove}
                className="w-8 h-8 p-0 hover:bg-destructive/20"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
