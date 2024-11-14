document.addEventListener("DOMContentLoaded", () => {
  // Função para abrir o modal
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      console.log(`Abrindo modal: ${modalId}`);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    } else {
      console.error(`Modal com ID "${modalId}" não encontrado.`);
    }
  };

  // Função para fechar o modal
  const closeModal = (modal) => {
    if (modal) {
      console.log(`Fechando modal: ${modal.id}`);
      modal.classList.remove("open");
      document.body.style.overflow = "";
    } else {
      console.error("Nenhum modal encontrado para fechar.");
    }
  };

  // Função para continuar para o próximo modal com atraso para evitar conflitos
  const continueModal = (e) => {
    e.preventDefault();
  
    const button = e.target.closest(".continue-modal");
  
    if (!button) {
      return;
    }
  
    const nextModalId = button.getAttribute("data-next-modal");
  
    if (!nextModalId) {
      return;
    }
  
    const currentModal = button.closest(".modal-background");
  
    if (currentModal) {
      closeModal(currentModal);
    }
  
    setTimeout(() => {
      openModal(nextModalId);
    }, 300);
  };
  

  // Adicionar eventos para os botões que abrem modais
  document.querySelectorAll("[data-modal-target]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = item.getAttribute("data-modal-target");
      if (modalId) {
        openModal(modalId);
      } else {
        console.error("Atributo data-modal-target não definido.");
      }
    });
  });

  // Adicionar eventos para fechar modais ao clicar fora
  document.querySelectorAll(".modal-background, .modal-1-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-background") || e.target.classList.contains("modal-1-overlay")) {
        closeModal(modal);
      }
    });
  });

  // Adicionar eventos para os botões "Continuar"
  document.querySelectorAll(".continue-modal").forEach((button) => {
    button.addEventListener("click", continueModal);
  });
});
