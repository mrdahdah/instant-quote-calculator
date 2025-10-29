import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function buildQuotePdf({ tenant, quote }: { tenant: { name: string }, quote: { name: string; email: string; selections?: any; total_price: number; currency: string } }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const text = (t: string, x: number, y: number, size = 12, f = font) => page.drawText(t, { x, y, size, font: f });

  text(`${tenant.name} — Instant Quote`, 50, 790, 18, bold);
  text(`Name: ${quote.name || ''}`, 50, 760);
  text(`Email: ${quote.email || ''}`, 50, 742);
  text(`Estimate: ${quote.currency} ${quote.total_price}`, 50, 720, 14, bold);
  text(`Valid for 7 days`, 50, 700, 10);
  page.drawLine({ start: { x: 50, y: 690 }, end: { x: 545, y: 690 }, thickness: 1, color: rgb(0.8,0.8,0.8) });

  const bytes = await pdfDoc.save();
  return bytes;
}
