export type Master = {
  id: string;
  src: string;
  title: string;
  method: string;
  voices: string;
};

/** Original plates. Each leaf of the 11,306 is a unique art; these are the masters it is painted from. */
export const MASTERS: Master[] = [
  {
    id: "standing",
    src: "/masters/standing.jpg",
    title: "The First Standing",
    method:
      "Sfumato flesh and a draughtsman’s count of joints. The picture’s subject is the child’s two legs and the parents’ hands.",
    voices: "Leonardo da Vinci, Michelangelo, Raphael, Donatello",
  },
  {
    id: "basin",
    src: "/masters/basin.jpg",
    title: "The Basin",
    method:
      "One candle, and the foot offered to be washed. Fingers and toes are separated on purpose, so care can be seen.",
    voices: "Caravaggio, Artemisia Gentileschi, Rembrandt, Rubens",
  },
  {
    id: "window",
    src: "/masters/window.jpg",
    title: "The Window",
    method:
      "Cool glazing and a needle held between finger and thumb. The child stands full length, both legs accounted for.",
    voices: "Jan van Eyck, Rogier van der Weyden, Albrecht Dürer, Johannes Vermeer",
  },
  {
    id: "dusk",
    src: "/masters/dusk.jpg",
    title: "The Dusk Walk",
    method:
      "Processional color, three generations in stride. Sandaled feet and joined hands stay anatomically whole under the splendor.",
    voices: "Titian, Tintoretto, Paolo Veronese, El Greco",
  },
  {
    id: "plaster",
    src: "/masters/plaster.jpg",
    title: "The Plaster Room",
    method:
      "Fresco gravity. Open hands rest where they can be counted. The child’s bare feet are the quiet fact of the picture.",
    voices: "Giotto, Masaccio, Fra Angelico, Piero della Francesca, Sandro Botticelli",
  },
  {
    id: "bread",
    src: "/masters/bread.jpg",
    title: "The Broken Loaf",
    method:
      "Earth pigment and a household fact: two hands on the bread, and the legs beneath the table, boots and knees correct.",
    voices: "Pieter Bruegel the Elder, Frans Hals, Diego Velázquez, Francisco Goya, Gustave Courbet",
  },
  {
    id: "shore",
    src: "/masters/shore.jpg",
    title: "The Shore",
    method:
      "Weather as a moral climate. The sleeping child’s legs hang with real knees and ankles; the carrying hand is spread and counted.",
    voices: "J. M. W. Turner, John Constable, William Blake, Eugène Delacroix, Théodore Géricault, Camille Corot",
  },
  {
    id: "garden",
    src: "/masters/garden.jpg",
    title: "The Garden Basin",
    method:
      "Broken color laid over a precise drawing. Toes in the water and the mother’s fingers are not allowed to dissolve into the light.",
    voices: "Claude Monet, Pierre-Auguste Renoir, Edgar Degas, Berthe Morisot, Mary Cassatt, Camille Pissarro, Paul Cézanne, Georges Seurat, Vincent van Gogh, Paul Gauguin",
  },
  {
    id: "planes",
    src: "/masters/planes.jpg",
    title: "The Colored Room",
    method:
      "The room is built of flat planes. The people are not. Hands, knees, and shoes remain whole.",
    voices: "Paul Cézanne, Georges Braque, Juan Gris, Fernand Léger",
  },
  {
    id: "monument",
    src: "/masters/monument.jpg",
    title: "The Monument",
    method:
      "Black contour and primary color, but each hanging hand keeps five digits and each figure keeps two feet. The body is not shattered to prove a theory.",
    voices: "Fernand Léger, Pablo Picasso, Albert Gleizes, Jean Metzinger, Amédée Ozenfant, Robert Delaunay, Sonia Delaunay",
  },
  {
    id: "orchard",
    src: "/masters/orchard.jpg",
    title: "The Orchard",
    method:
      "Gold ground and a costly border. Under the pattern, three people stand with separate hands and sandaled, correctly drawn feet.",
    voices: "Gustav Klimt, Raja Ravi Varma, Amrita Sher-Gil",
  },
  {
    id: "sofa",
    src: "/masters/sofa.jpg",
    title: "The Sofa",
    method:
      "Patient flesh. Four hands rest apart from one another. Socked feet show their toes. Nothing is smeared into an extra limb.",
    voices: "Jean-Auguste-Dominique Ingres, Édouard Manet, Edgar Degas, Lucian Freud",
  },
  {
    id: "bridge",
    src: "/masters/bridge.jpg",
    title: "The Bridge",
    method:
      "Ink and mineral color, a precise walking line. Two figures, four legs, a single clasp of hands, mist that does not erase a foot.",
    voices: "Katsushika Hokusai, Utagawa Hiroshige, Qi Baishi, Zhang Daqian, Xu Beihong",
  },
  {
    id: "lamp",
    src: "/masters/lamp.jpg",
    title: "The Lamp",
    method:
      "A household nocturne. The girl’s bare feet are fully described; the boy stands on two legs; the braiding hands stay a pair.",
    voices: "Anthony van Dyck, Nicolas Poussin, Frida Kahlo, Diego Rivera",
  },
  {
    id: "lift",
    src: "/masters/lift.jpg",
    title: "The Lift",
    method:
      "A painted monument of joy. The parent’s hands lock under the arms without fusing, and the child’s two kicking legs end in real feet.",
    voices: "Gian Lorenzo Bernini, Ben Enwonwu, Louise Bourgeois",
  },
  {
    id: "palms",
    src: "/masters/palms.jpg",
    title: "The Open Palms",
    method:
      "Mural scale. Six palms face us so the fingers can be counted, and the legs stand like the posts of a house.",
    voices: "José Clemente Orozco, David Alfaro Siqueiros, Diego Rivera, Wifredo Lam, Tarsila do Amaral, Ibrahim El-Salahi",
  },
  {
    id: "squares",
    src: "/masters/squares.jpg",
    title: "The Field",
    method:
      "An abstract field is only weather. The elder and the child are drawn inside it with ordinary, accurate hands, legs, and shoes. A dot is never asked to be a finger.",
    voices: "Hilma af Klint, Wassily Kandinsky, Paul Klee, Piet Mondrian, Kazimir Malevich, Jackson Pollock, Mark Rothko, Willem de Kooning, Lee Krasner, Helen Frankenthaler, Agnes Martin, Bridget Riley",
  },
  {
    id: "cloth",
    src: "/masters/cloth.jpg",
    title: "The Story Cloth",
    method:
      "A stitched border around a walking line of three. Flat color, academic stride, hands joined without becoming mittens.",
    voices: "Andy Warhol, Roy Lichtenstein, Jean-Michel Basquiat, Keith Haring, Robert Rauschenberg, Jasper Johns, David Hockney, Yayoi Kusama, Faith Ringgold, Ai Weiwei",
  },
];

export function masterFor(n: number): Master {
  const index = Math.abs(Math.floor(n) * 5) % MASTERS.length;
  return MASTERS[index] ?? MASTERS[0];
}
