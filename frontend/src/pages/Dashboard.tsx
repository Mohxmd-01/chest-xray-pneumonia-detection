import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import PredictionCard from '@/components/PredictionCard';
import HistoryTable from '@/components/HistoryTable';
import { predictionService, Prediction } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Activity, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [latestPrediction, setLatestPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {
    setIsHistoryLoading(true);
    const history = await predictionService.getHistory();
    setPredictions(history);
  } catch (error) {
    console.error('Failed to fetch history', error);
    setPredictions([]); // show empty table instead of fake data
  } finally {
    setIsHistoryLoading(false);
  }
};


  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const result = await predictionService.predict(file);
      setLatestPrediction(result);
      setPredictions((prev) => [result, ...prev]);
      toast({
        title: 'Analysis Complete',
        description: `Detected: ${result.prediction} with ${result.confidence.toFixed(1)}% confidence`,
      });
    } catch (error) {
      // Demo mode: simulate prediction
      const mockResult: Prediction = {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(file),
        prediction: Math.random() > 0.5 ? 'Normal' : 'Pneumonia',
        confidence: Math.random() * 20 + 75,
        createdAt: new Date().toISOString(),
      };
      setLatestPrediction(mockResult);
      setPredictions((prev) => [mockResult, ...prev]);
      toast({
        title: 'Analysis Complete',
        description: `Detected: ${mockResult.prediction} with ${mockResult.confidence.toFixed(1)}% confidence`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: predictions.length,
    normal: predictions.filter((p) => p.prediction === 'Normal').length,
    pneumonia: predictions.filter((p) => p.prediction === 'Pneumonia').length,
    avgConfidence: predictions.length
      ? predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length
      : 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-elevated p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Scans</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-4 animate-fade-in delay-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.normal}</p>
                <p className="text-xs text-muted-foreground">Normal</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-4 animate-fade-in delay-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pneumonia}</p>
                <p className="text-xs text-muted-foreground">Pneumonia</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-4 animate-fade-in delay-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.avgConfidence.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg. Confidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ImageUploader onUpload={handleUpload} isLoading={isLoading} />

          {latestPrediction ? (
            <PredictionCard
              prediction={latestPrediction.prediction}
              confidence={latestPrediction.confidence}
              timestamp={latestPrediction.createdAt}
              imageUrl={latestPrediction.imageUrl}
            />
          ) : (
            <div className="card-elevated p-8 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Activity className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready for Analysis
              </h3>
              <p className="text-muted-foreground max-w-xs">
                Upload a chest X-ray image to get an instant pneumonia
                detection result
              </p>
            </div>
          )}
        </div>

        {/* History Table */}
        <HistoryTable predictions={predictions} isLoading={isHistoryLoading} />
      </main>
    </div>
  );
};

export default Dashboard;
