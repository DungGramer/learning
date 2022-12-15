import initialData from './initial-data';
import Column from './column';
import { useState } from 'react';

function App() {
  const [state, setState] = useState(initialData);

  return (
    <div className="App">
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}

export default App;
