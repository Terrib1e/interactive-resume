/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ExportButton.tsx
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const ExportButton = () => {
  const exportToPDF = async () => {
    const resume = document.getElementById('resume-content')
    if (!resume) return

    try {
      const canvas = await html2canvas(resume, {
        scale: 2,
        logging: false,
        useCORS: true
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF('p', 'mm')
      const position = 0

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      )

      pdf.save('resume.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <Button
      onClick={exportToPDF}
      className="fixed bottom-4 right-4"
      variant="default"
    >
      <Download className="w-4 h-4 mr-2" />
      Export PDF
    </Button>
  )
}