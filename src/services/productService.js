import {
  ref,
  push,
  set,
  onValue,
  remove,
  update
} from "firebase/database";

import { database } from "../firebase/firebaseConfig";

/* ADICIONAR */

export function adicionarProduto(produto) {

  const produtosRef =
    ref(database, "produtos");

  const novoProdutoRef =
    push(produtosRef);

  set(novoProdutoRef, {
    ...produto,
    firebaseId: novoProdutoRef.key
  });

}

/* LISTAR */

export function listarProdutos(callback) {

  const produtosRef =
    ref(database, "produtos");

  onValue(produtosRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) {

      callback([]);

      return;

    }

    const lista =
      Object.values(data);

    callback(lista);

  });

}

/* EXCLUIR */

export function excluirProduto(id) {

  const produtoRef =
    ref(
      database,
      `produtos/${id}`
    );

  remove(produtoRef);

}

/* EDITAR */

export function editarProduto(
  id,
  novosDados
) {

  const produtoRef =
    ref(
      database,
      `produtos/${id}`
    );

  update(produtoRef, novosDados);

}