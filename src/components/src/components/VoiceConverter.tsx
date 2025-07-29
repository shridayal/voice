import React, { useState } from 'react';
import { AudioUpload } from './AudioUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, Wand2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ConversionStatus = 'idle' | 'processing' | 'completed' | 'error';

export const VoiceConverter: React.FC = () => {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [conversionStatus, setConversionStatus] = useState<ConversionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedAudioUrl, setConvertedAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const canConvert = sourceFile && targetFile && conversionStatus === 'idle';

  const simulateConversion = async () => {
    if (!canConvert) return;

    setConversionStatus('processing');
    setProgress(0);

    // Simulate processing with progress updates
    const progressSteps = [
      { step: 'Analyzing source audio...', progress: 20 },
      { step: 'Processing target voice characteristics...', progress: 40 },
      { step: 'Applying voice conversion...', progress: 70 },
      { step: 'Finalizing audio output...', progress: 90 },
      { step: 'Conversion complete!', progress: 100 }
    ];

    for (const { step, progress: stepProgress } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(stepProgress);
      
      toast({
        title: "Processing",
        description: step,
      });
    }

    // Simulate successful conversion
    setConversionStatus('completed');
    setConvertedAudioUrl('mock-converted-audio.wav'); // In real implementation, this would be the actual URL
    
    toast({
      title: "Success!",
      description: "Voice conversion completed successfully.",
    });
  };

  const handleDownload = () => {
    if (convertedAudioUrl) {
      // In a real implementation, this would trigger the actual download
      toast({
        title: "Download Started",
        description: "Your converted audio file is being downloaded.",
      });
    }
  };

  const handleReset = () => {
    setSourceFile(null);
    setTargetFile(null);
    setConversionStatus('idle');
    setProgress(0);
    setConvertedAudioUrl(null);
  };

  const getStatusIcon = () => {
    switch (conversionStatus) {
      case 'processing':
        return <Wand2 className="w-5 h-5 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Wand2 className="w-5 h-5" />;
    }
  };

  const getStatusText = () => {
    switch (conversionStatus) {
      case 'processing':
        return 'Converting voice...';
      case 'completed':
        return 'Conversion completed!';
      case 'error':
        return 'Conversion failed';
      default:
        return 'Convert Voice';
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <AudioUpload
          label="Source Audio (Your Voice)"
          file={sourceFile}
          onFileUpload={setSourceFile}
          onFileRemove={() => setSourceFile(null)}
          disabled={conversionStatus === 'processing'}
        />
        
        <AudioUpload
          label="Target Voice (Voice to Emulate)"
          file={targetFile}
          onFileUpload={setTargetFile}
          onFileRemove={() => setTargetFile(null)}
          disabled={conversionStatus === 'processing'}
        />
      </div>

      {/* Conversion Section */}
      <Card className="p-6 bg-card border-border">
        <div className="text-center space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Voice Conversion</h3>
          
          {conversionStatus === 'processing' && (
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Processing... {progress}%
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button
              onClick={simulateConversion}
              disabled={!canConvert}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              {getStatusIcon()}
              {getStatusText()}
            </Button>

            {conversionStatus === 'completed' && (
              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Result
              </Button>
            )}

            {(conversionStatus === 'completed' || conversionStatus === 'error') && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
              >
                Reset
              </Button>
            )}
          </div>

          {!canConvert && conversionStatus === 'idle' && (
            <p className="text-sm text-muted-foreground">
              Upload both source and target audio files to begin conversion
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
