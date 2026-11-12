import {
  CHAMBERS,
  CLAUSES,
  FORMS,
  OBJECTS,
  PERSONS,
  SCHOOLS,
  TRADITIONS,
  chamberIndex,
  type Chamber,
  type Tradition,
} from "./catalog";

export type Leaf = {
  n: number;
  title: string;
  body: string;
  chamber: Chamber;
  tradition: Tradition;
  school: string;
};

export function leafOf(n: number): Leaf {
  const index = Math.min(PERSONS.length * OBJECTS.length, Math.max(1, Math.floor(n)));
  const person = PERSONS[(index - 1) % PERSONS.length] ?? PERSONS[0];
  const object =
    OBJECTS[Math.floor((index - 1) / PERSONS.length)] ?? OBJECTS[OBJECTS.length - 1];
  const chamber = CHAMBERS[chamberIndex(index)] ?? CHAMBERS[0];
  const form = FORMS[index % FORMS.length] ?? FORMS[0];
  const clause = CLAUSES[(index * 5) % CLAUSES.length] ?? CLAUSES[0];
  const tradition = TRADITIONS[(index * 3) % TRADITIONS.length] ?? TRADITIONS[0];
  const school = SCHOOLS[(index * 7) % SCHOOLS.length] ?? SCHOOLS[0];
  return {
    n: index,
    title: `${person} and ${object}`,
    body: `${form(person, object)} ${clause} ${chamber.practice}`,
    chamber,
    tradition,
    school,
  };
}
