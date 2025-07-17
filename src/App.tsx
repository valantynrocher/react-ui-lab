const App = () => {
  return (
    <>
      <ol>
        <li>Ouvrez un terminal à la racine du projet.</li>
        <li>
          Installez les dépendances si ce n'est pas déjà fait :{" "}
          <code>npm install</code> ou <code>yarn install</code>.
        </li>
        <li>
          Lancez Storybook avec : <code>npm run storybook</code> ou{" "}
          <code>yarn storybook</code>.
        </li>
        <li>
          Ouvrez votre navigateur à l'adresse indiquée (généralement{" "}
          <code>http://localhost:6006</code>).
        </li>
        <li>
          Parcourez les composants sous "Lab" dans la barre latérale de
          Storybook.
        </li>
      </ol>
    </>
  );
};

export default App;
