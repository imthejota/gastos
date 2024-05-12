
import Actions from "./Actions";

const Item = ({ nombre, categoria, valor, id }) => {
  return (
    <li>
      <h3>{nombre}</h3>
      <p>{categoria}</p>
      <p>${valor}</p>
      <Actions id={id} />
    </li>
  );
};

export default Item;
