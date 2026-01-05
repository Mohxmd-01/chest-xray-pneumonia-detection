import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader = ({ onUpload, isLoading }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.dcm'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  const clearPreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="card-elevated p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Upload X-Ray Image</h2>
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
        </div>
      </div>

      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300",
              isDragActive ? "bg-primary/20" : "bg-muted"
            )}>
              <ImageIcon className={cn(
                "h-8 w-8 transition-colors duration-300",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {isDragActive ? "Drop your image here" : "Drag & drop your chest X-ray"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (PNG, JPG, DICOM)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-muted/30 border border-border">
            <img
              src={preview}
              alt="X-ray preview"
              className="w-full h-64 object-contain"
            />
            <button
              onClick={clearPreview}
              disabled={isLoading}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
              {file?.name}
            </p>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              variant="gradient"
              size="lg"
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Analyze Image
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
