import { VoiceConverter } from '@/components/VoiceConverter';
import { Mic, AudioWaveform } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <AudioWaveform className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">VoiceShift</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Voice Conversion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-audio rounded-full px-4 py-2 mb-6">
              <Mic className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Transform Your Voice</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Convert Any Voice to Any Voice
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your audio and a target voice sample. Our AI will convert your speech 
              to match the target voice's characteristics while preserving your original content.
            </p>
          </div>

          {/* Converter Component */}
          <VoiceConverter />

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-audio rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AudioWaveform className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI models ensure natural-sounding voice conversion
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-audio rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Simple drag-and-drop interface for seamless voice conversion
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-audio rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded-sm" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">
                Quick conversion times to get your results in minutes
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
