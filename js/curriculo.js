const { jsPDF } = window.jspdf;

document.getElementById('download-pdf').addEventListener('click', async function () {
  const element = document.getElementById('resume-content');
  const button = this;

  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
  button.disabled = true;

  try {
    const canvas = await html2canvas(element, {
      scale: 1.8,                // AUMENTA O TAMANHO VISUAL
      useCORS: true,
      backgroundColor: '#FFFFFF',
      windowWidth: 1200,         // força layout desktop
      windowHeight: element.scrollHeight,
    });

    // JPEG balanceado (qualidade boa + leve)
    const imgData = canvas.toDataURL('image/jpeg', 0.72);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 8;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      imgData,
      'JPEG',
      margin,
      margin,
      imgWidth,
      imgHeight,
      undefined,
      'FAST' // compressão extra
    );

    pdf.save('William_Cruvinel_Curriculo.pdf');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
  }
});
