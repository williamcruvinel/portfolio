const { jsPDF } = window.jspdf;

document.getElementById('download-pdf').addEventListener('click', function () {
  const element = document.getElementById('resume-content');
  const button = this;

  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
  button.disabled = true;

  html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth - 5; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const finalHeight = Math.min(imgHeight, pageHeight - 5);
      const finalWidth = (canvas.width * finalHeight) / canvas.height;

      const xPos = (pageWidth - finalWidth) / 2;
      const yPos = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, finalWidth, finalHeight);
      pdf.save('William_Cruvinel_Curriculo.pdf');

      button.innerHTML = originalText;
      button.disabled = false;
    })
    .catch((error) => {
      console.error('Erro:', error);
      button.innerHTML = originalText;
      button.disabled = false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.resume').style.opacity = '0';
  document.querySelector('.resume').style.transform = 'translateY(20px)';

  setTimeout(() => {
    document.querySelector('.resume').style.transition =
      'opacity 0.5s ease, transform 0.5s ease';
    document.querySelector('.resume').style.opacity = '1';
    document.querySelector('.resume').style.transform = 'translateY(0)';
  }, 100);
});
