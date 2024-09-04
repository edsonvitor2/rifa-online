class Pagamento {
  constructor(){
      this.iniciarBotoes();
  }

  iniciarBotoes(){
      const gerarQrCode = document.getElementById("generate-payment");

      gerarQrCode.addEventListener("click", (e) => {
          console.log('Gerando pagamento...');
          this.gerarQrCode();
      });
  }

  verificarPagamento(paymentId) {
    fetch(`http://localhost:3000/check-payment-status/${paymentId}`)
    .then(response => response.json())
    .then(data => {

        console.log('Pagamento ainda não aprovado:', data);
       
    })
    .catch(error => {
        console.error('Erro ao verificar o pagamento:', error);
    });
    }

  gerarQrCode() {
    // Dados do usuário e do pagamento
    let email = 'edsoncousa@gmail.com';
    let valor = 50.00;
    let descricao = 'Compra Cotas';
    let formaPagamento = 'pix';
    
    fetch('http://localhost:3000/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transaction_amount: valor, // Valor da transação
            description: descricao, // Descrição da transação
            email: email, // E-mail do pagador
            payment_method_id: formaPagamento // Método de pagamento, neste caso 'pix'
        })
    })
    .then(response => response.json())
    .then(data => {
        // Exibir o QR Code e outros dados retornados
        if (data.point_of_interaction && data.point_of_interaction.transaction_data) {
            let qrCodeBase64 = data.point_of_interaction.transaction_data.qr_code_base64;
            console.log('QR Code (Base64):', data);
            this.verificarPagamento(data.id);
            // Cria a tag <img> para exibir o QR Code
            let imgTag = document.createElement('img');
            imgTag.src = `data:image/png;base64,${qrCodeBase64}`; // Define o src como a imagem em base64
            imgTag.alt = 'QR Code de Pagamento';

            // Exibe o QR Code no contêiner
            const qrCodeContainer = document.getElementById('qr-code-container');
            qrCodeContainer.innerHTML = ''; // Limpa o conteúdo anterior
            qrCodeContainer.appendChild(imgTag); // Adiciona a tag <img> dentro do contêiner
        } else {
            console.log('Dados do pagamento:', data);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao criar o pagamento.');
    });
}

}


// Instancia a classe de Pagamento
document.addEventListener('DOMContentLoaded', () => {
  const pagamento = new Pagamento();
});