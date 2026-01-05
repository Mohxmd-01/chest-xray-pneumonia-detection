import { CheckCircle2, AlertTriangle, Clock, Percent, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  prediction: 'Normal' | 'Pneumonia';
  confidence: number;
  timestamp: string;
  imageUrl?: string;
}

const PredictionCard = ({ prediction, confidence, timestamp, imageUrl }: PredictionCardProps) => {
  const isNormal = prediction === 'Normal';
  const isPneumonia = prediction === 'Pneumonia';
  const isHighConfidence = confidence >= 70;

  const getConfidenceColor = () => {
    if (isPneumonia && isHighConfidence) return 'text-destructive';
    if (isNormal && isHighConfidence) return 'text-success';
    return 'text-warning';
  };

  const getConfidenceBarColor = () => {
    if (isPneumonia && isHighConfidence) return 'bg-destructive';
    if (isNormal && isHighConfidence) return 'bg-success';
    return 'bg-warning';
  };

  return (
    <div className="card-elevated overflow-hidden animate-fade-in-up">
      <div className={cn(
        "h-2 w-full",
        isNormal ? "bg-success" : "bg-destructive"
      )} />
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className={cn(
            "h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0",
            isNormal ? "bg-success/10" : "bg-destructive/10"
          )}>
            {isNormal ? (
              <CheckCircle2 className="h-7 w-7 text-success" />
            ) : (
              <AlertTriangle className="h-7 w-7 text-destructive" />
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">Diagnosis Result</p>
            <h3 className={cn(
              "text-2xl font-bold",
              isNormal ? "text-success" : "text-destructive"
            )}>
              {prediction}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isNormal 
                ? "No signs of pneumonia detected" 
                : "Pneumonia indicators detected"}
            </p>
          </div>
        </div>

        {imageUrl && (
          <div className="mb-6 rounded-lg overflow-hidden border border-border bg-muted/30">
            <img 
              src={imageUrl} 
              alt="Analyzed X-ray" 
              className="w-full h-48 object-contain"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
              <Percent className={cn("h-4 w-4", getConfidenceColor())} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Confidence Level</span>
                <span className={cn("text-lg font-bold", getConfidenceColor())}>
                  {confidence.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000", getConfidenceBarColor())}
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Analysis Time</p>
              <p className="text-sm font-medium text-foreground">
                {timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className={cn(
          "mt-6 p-4 rounded-lg",
          isNormal ? "bg-success/5 border border-success/20" : "bg-destructive/5 border border-destructive/20"
        )}>
          <div className="flex items-center gap-2">
            <TrendingUp className={cn("h-4 w-4", isNormal ? "text-success" : "text-destructive")} />
            <span className="text-sm font-medium text-foreground">
              {isNormal 
                ? "Continue regular health monitoring" 
                : "Consult a healthcare professional"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
