const fs = require('fs');

const en = {
  AI: {
    title: "Biblik AI Assistant",
    desc: "Ask Bible questions, explore topics, and get scripture insights.",
    greeting: "How can I help you understand the Bible today?",
    q1: "What does John 3:16 mean?",
    q2: "Explain the Book of Romans",
    q3: "Create a Bible study on faith",
    placeholder: "Ask Biblik AI..."
  },
  Groups: {
    communities: "Communities",
    communities_desc: "Join a group to study the Bible together.",
    create_group: "Create Group",
    error: "Error loading groups. Ensure the database schema is created.",
    no_groups: "No groups found",
    no_groups_desc: "Be the first to create a community!",
    view_community: "View Community →",
    donate: "Donate & Support",
    debates: "Debates & Discussions",
    voice_chat: "🎤 Voice Chat",
    start_debate: "Start Debate",
    no_debates: "No debates yet",
    no_debates_desc: "Start a discussion by referencing a Bible verse!"
  },
  Debates: {
    back: "← Back to {name}",
    discussion: "Discussion",
    reply: "Reply",
    post_reply: "Post Reply",
    cancel: "Cancel",
    post_comment: "Post Comment",
    write_reply: "Write a reply...",
    share_thoughts: "Share your thoughts on this verse..."
  },
  Voice: {
    title: "Live Voice Chat",
    realtime: "Real-time",
    no_messages: "No voice messages yet. Be the first to speak!",
    sending: "Sending...",
    group_chat: "Group Voice Chat",
    desc: "Hold the microphone to send a voice message to everyone in {name}."
  }
};

const ht = {
  AI: {
    title: "Asistan AI Biblik",
    desc: "Poze kesyon sou Bib la, eksplore sijè, epi jwenn apèsi sou ekriti yo.",
    greeting: "Kijan mwen ka ede w konprann Bib la jodi a?",
    q1: "Kisa Jan 3:16 vle di?",
    q2: "Eksplike Liv Ròm yo",
    q3: "Kreye yon etid biblik sou lafwa",
    placeholder: "Mande Biblik AI..."
  },
  Groups: {
    communities: "Kominote",
    communities_desc: "Antre nan yon gwoup pou etidye Bib la ansanm.",
    create_group: "Kreye Gwoup",
    error: "Erè chaje gwoup yo. Asire baz done a an plas.",
    no_groups: "Pa jwenn okenn gwoup",
    no_groups_desc: "Se ou menm ki pou kreye premye kominote a!",
    view_community: "Gade Kominote →",
    donate: "Bay & Sipòte",
    debates: "Deba & Diskisyon",
    voice_chat: "🎤 Vwa Chat",
    start_debate: "Kòmanse yon Deba",
    no_debates: "Pa gen deba poko",
    no_debates_desc: "Kòmanse yon diskisyon baze sou yon vèsè Biblik!"
  },
  Debates: {
    back: "← Tounen nan {name}",
    discussion: "Diskisyon",
    reply: "Reponn",
    post_reply: "Afiche Repons",
    cancel: "Anile",
    post_comment: "Afiche Kòmantè",
    write_reply: "Ekri yon repons...",
    share_thoughts: "Pataje panse ou sou vèsè sa a..."
  },
  Voice: {
    title: "Vwa Chat an Dirèk",
    realtime: "An Dirèk",
    no_messages: "Pa gen mesaj vwa poko. Ou mèt pale an premye!",
    sending: "Ap voye...",
    group_chat: "Vwa Chat Gwoup la",
    desc: "Kenbe mikwo a pou w voye yon mesaj vwa bay tout moun nan {name}."
  }
};

const fr = {
  AI: {
    title: "Assistant IA Biblik",
    desc: "Posez des questions sur la Bible, explorez des sujets et obtenez des idées scripturaires.",
    greeting: "Comment puis-je vous aider à comprendre la Bible aujourd'hui?",
    q1: "Que signifie Jean 3:16?",
    q2: "Expliquez le livre des Romains",
    q3: "Créer une étude biblique sur la foi",
    placeholder: "Demander à Biblik IA..."
  },
  Groups: {
    communities: "Communautés",
    communities_desc: "Rejoignez un groupe pour étudier la Bible ensemble.",
    create_group: "Créer un groupe",
    error: "Erreur de chargement des groupes.",
    no_groups: "Aucun groupe trouvé",
    no_groups_desc: "Soyez le premier à créer une communauté!",
    view_community: "Voir la communauté →",
    donate: "Faire un don",
    debates: "Débats & Discussions",
    voice_chat: "🎤 Chat vocal",
    start_debate: "Lancer le débat",
    no_debates: "Pas encore de débats",
    no_debates_desc: "Commencez une discussion en citant un verset biblique!"
  },
  Debates: {
    back: "← Retour à {name}",
    discussion: "Discussion",
    reply: "Répondre",
    post_reply: "Poster la réponse",
    cancel: "Annuler",
    post_comment: "Poster un commentaire",
    write_reply: "Écrire une réponse...",
    share_thoughts: "Partagez vos pensées sur ce verset..."
  },
  Voice: {
    title: "Chat vocal en direct",
    realtime: "Temps réel",
    no_messages: "Pas de messages vocaux.",
    sending: "Envoi en cours...",
    group_chat: "Chat vocal de groupe",
    desc: "Maintenez le micro pour envoyer un message vocal à tout le monde dans {name}."
  }
};

const es = {
  AI: {
    title: "Asistente de IA Biblik",
    desc: "Haga preguntas bíblicas, explore temas y obtenga información sobre las Escrituras.",
    greeting: "¿Cómo puedo ayudarte a entender la Biblia hoy?",
    q1: "¿Qué significa Juan 3:16?",
    q2: "Explique el libro de Romanos",
    q3: "Crear un estudio bíblico sobre la fe",
    placeholder: "Pregunta a la IA Biblik..."
  },
  Groups: {
    communities: "Comunidades",
    communities_desc: "Únete a un grupo para estudiar la Biblia juntos.",
    create_group: "Crear grupo",
    error: "Error al cargar grupos.",
    no_groups: "No se encontraron grupos",
    no_groups_desc: "¡Sé el primero en crear una comunidad!",
    view_community: "Ver comunidad →",
    donate: "Donar y apoyar",
    debates: "Debates y discusiones",
    voice_chat: "🎤 Chat de voz",
    start_debate: "Iniciar debate",
    no_debates: "No hay debates aún",
    no_debates_desc: "¡Comienza una discusión citando un versículo bíblico!"
  },
  Debates: {
    back: "← Volver a {name}",
    discussion: "Discusión",
    reply: "Responder",
    post_reply: "Publicar respuesta",
    cancel: "Cancelar",
    post_comment: "Publicar comentario",
    write_reply: "Escribe una respuesta...",
    share_thoughts: "Comparte tus pensamientos sobre este versículo..."
  },
  Voice: {
    title: "Chat de voz en vivo",
    realtime: "Tiempo real",
    no_messages: "No hay mensajes de voz aún.",
    sending: "Enviando...",
    group_chat: "Chat de voz grupal",
    desc: "Mantén presionado el micrófono para enviar un mensaje a todos en {name}."
  }
};

const dicts = { en, ht, fr, es };

for (const lang of Object.keys(dicts)) {
  const file = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.AI = dicts[lang].AI;
  data.Groups = dicts[lang].Groups;
  data.Debates = dicts[lang].Debates;
  data.Voice = dicts[lang].Voice;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
