import { DataSource } from "typeorm";
import { Users } from "../entities/user.entity";
import { Posts } from "../entities/post.entity";
import path from "path";

export const useMock = {
  username: "antonio",
  password: "123",
  email: "",
  permissionType: 1,
};

export const postMock = {
  title: "As Leis de Newton na Era Espacial",
  description: "Como os princípios de Newton impulsionam a exploração cósmica",
  content:
    "Na corrida espacial do século XXI, as Leis de Newton continuam tão relevantes quanto eram no século XVII. A **Primeira Lei** explica por que os satélites permanecem em órbita - a menos que atrito atmosférico ou forças gravitacionais os desviem, eles mantêm seu movimento indefinidamente. A **Segunda Lei** é crucial no projeto de foguetes, onde cada newton de força (F) deve ser calculado precisamente para acelerar (a) massivas estruturas (m) como o Falcon Heavy da SpaceX. Já a **Terceira Lei** se manifesta dramaticamente nos lançamentos: o gás expelido para baixo (ação) gera a força propulsora para cima (reação).\n\nCuriosidade: A Estação Espacial Internacional, que orbita a 400km de altitude, é um laboratório perfeito para demonstrar essas leis em microgravidade, onde objetos parecem desafiar nossa intuição terrestre.",
  subject: "Física Aplicada",
  user_id: 4,
};
