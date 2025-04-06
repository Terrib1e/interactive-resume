// src/components/ExportButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

type PaperSize = 'a4' | 'letter' | 'legal';
type Orientation = 'portrait' | 'landscape';

interface PaperDimensions {
  width: number;
  height: number;
}

const paperSizes: Record<PaperSize, PaperDimensions> = {
  a4: { width: 210, height: 297 }, // mm
  letter: { width: 215.9, height: 279.4 }, // mm
  legal: { width: 215.9, height: 355.6 }, // mm
};

export const ExportButton = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paperSize, setPaperSize] = useState<PaperSize>('a4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [includeLinks, setIncludeLinks] = useState(true);
  const [highQuality, setHighQuality] = useState(true);

  const exportToPDF = async () => {
    const resume = document.getElementById('resume-content');
    if (!resume) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'Could not find resume content to export.',
      });
      return;
    }

    setIsExporting(true);

    try {
      // Apply temporary print styles
      document.body.classList.add('print-export');

      // Determine dimensions based on paper size and orientation
      let { width, height } = paperSizes[paperSize];
      if (orientation === 'landscape') {
        [width, height] = [height, width];
      }

      // Generate canvas with appropriate settings
      const canvas = await html2canvas(resume, {
        scale: highQuality ? 2 : 1.5,
        logging: false,
        useCORS: true,
        allowTaint: !includeLinks,
        backgroundColor: '#ffffff',
      });

      // Calculate dimensions
      const imgWidth = width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with correct orientation
      const pdf = new jsPDF(orientation, 'mm', [width, height]);

      // Add canvas as image
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

      // Download the PDF
      pdf.save('resume.pdf');

      toast({
        title: 'Export successful',
        description: 'Your resume has been exported as a PDF.',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'There was an error generating your PDF. Please try again.',
      });
    } finally {
      // Remove temporary print styles
      document.body.classList.remove('print-export');
      setIsExporting(false);
      setIsDialogOpen(false);
    }
  };

  const exportToImage = async () => {
    const resume = document.getElementById('resume-content');
    if (!resume) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'Could not find resume content to export.',
      });
      return;
    }

    setIsExporting(true);

    try {
      // Apply temporary print styles
      document.body.classList.add('print-export');

      // Generate canvas
      const canvas = await html2canvas(resume, {
        scale: highQuality ? 2 : 1.5,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Convert to image
      const image = canvas.toDataURL('image/png', 1.0);

      // Create download link
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = image;
      link.click();

      toast({
        title: 'Export successful',
        description: 'Your resume has been exported as an image.',
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'There was an error generating your image. Please try again.',
      });
    } finally {
      // Remove temporary print styles
      document.body.classList.remove('print-export');
      setIsExporting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="fixed bottom-4 right-4" variant="default">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={exportToImage}>
            <Download className="w-4 h-4 mr-2" />
            Export as Image
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Resume as PDF</DialogTitle>
            <DialogDescription>Customize your export settings before downloading</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="paper-size">Paper Size</Label>
              <Select value={paperSize} onValueChange={(value: PaperSize) => setPaperSize(value)}>
                <SelectTrigger id="paper-size">
                  <SelectValue placeholder="Select paper size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="orientation">Orientation</Label>
              <Select value={orientation} onValueChange={(value: Orientation) => setOrientation(value)}>
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="high-quality" checked={highQuality} onCheckedChange={(checked) => setHighQuality(!!checked)} />
              <Label htmlFor="high-quality">High quality (larger file size)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="include-links" checked={includeLinks} onCheckedChange={(checked) => setIncludeLinks(!!checked)} />
              <Label htmlFor="include-links">Include links (may affect formatting)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={exportToPDF} disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
