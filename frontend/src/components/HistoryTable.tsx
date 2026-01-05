import { useState } from 'react';
import { ArrowUpDown, CheckCircle2, AlertTriangle, Eye, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Prediction } from '@/services/api';

interface HistoryTableProps {
  predictions: Prediction[];
  isLoading: boolean;
}

type SortField = 'createdAt' | 'confidence';
type SortOrder = 'asc' | 'desc';

const formatDate = (date?: string) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
};

const HistoryTable = ({ predictions, isLoading }: HistoryTableProps) => {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedPredictions = [...predictions].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'createdAt') {
  const timeA = a.createdAt && !isNaN(Date.parse(a.createdAt))
  ? Date.parse(a.createdAt)
  : 0;

const timeB = b.createdAt && !isNaN(Date.parse(b.createdAt))
  ? Date.parse(b.createdAt)
  : 0;

comparison = timeA - timeB;

}
 else if (sortField === 'confidence') {
      comparison = a.confidence - b.confidence;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (isLoading) {
    return (
      <div className="card-elevated p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading prediction history...</p>
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="card-elevated p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">No Predictions Yet</h3>
            <p className="text-muted-foreground mt-1">
              Upload a chest X-ray to get your first prediction
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-elevated overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Prediction History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {predictions.length} prediction{predictions.length !== 1 ? 's' : ''} recorded
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-4 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('confidence')}
                    className="h-auto p-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                  >
                    Confidence
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-4 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('createdAt')}
                    className="h-auto p-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                  >
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedPredictions.map((prediction, index) => (
                <tr
                  key={prediction.id}
                  className="hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted border border-border">
                      <img
                        src={prediction.imageUrl}
                        alt="X-ray thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {prediction.prediction === 'Normal' ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={cn(
                        "font-medium",
                        prediction.prediction === 'Normal' ? "text-success" : "text-destructive"
                      )}>
                        {prediction.prediction}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            prediction.prediction === 'Normal' ? "bg-success" : "bg-destructive"
                          )}
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {prediction.confidence.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                       {formatDate(prediction.createdAt)}
                      </span>

                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPrediction(prediction)}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedPrediction} onOpenChange={() => setSelectedPrediction(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Prediction Details</DialogTitle>
          </DialogHeader>
          {selectedPrediction && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
                <img
                  src={selectedPrediction.imageUrl}
                  alt="X-ray"
                  className="w-full h-64 object-contain"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={cn(
                  "p-4 rounded-lg",
                  selectedPrediction.prediction === 'Normal' 
                    ? "bg-success/10 border border-success/20" 
                    : "bg-destructive/10 border border-destructive/20"
                )}>
                  <p className="text-xs text-muted-foreground mb-1">Result</p>
                  <div className="flex items-center gap-2">
                    {selectedPrediction.prediction === 'Normal' ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    )}
                    <span className={cn(
                      "font-bold text-lg",
                      selectedPrediction.prediction === 'Normal' ? "text-success" : "text-destructive"
                    )}>
                      {selectedPrediction.prediction}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                  <p className="font-bold text-lg text-foreground">
                    {selectedPrediction.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Analysis Date & Time</p>
                <p className="font-medium text-foreground">
                {formatDate(selectedPrediction.createdAt)}
                </p>

              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryTable;
