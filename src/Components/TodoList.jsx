import TodoItem from './TodoItem';
import Filter from './Filter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TodoList = ({ items, updateItem, selectedFilter, updateFilter, updateItems, deleteItem, clearCompleted }) => {
  
  // Check if items is an array before mapping over it
  const renderedList = Array.isArray(items) ? items.map(({ id, text, checked }, index) => (
    <TodoItem key={id} index={index} id={id} updateItem={updateItem} deleteItem={deleteItem} checked={checked} text={text} />
  )) : [];

  // Similarly, check if items is an array before mapping over it
  const renderedListActive = Array.isArray(items) ? items.map(({ id, text, checked }, index) => (
    !checked ? (
      <TodoItem key={id} index={index} id={id} updateItem={updateItem} deleteItem={deleteItem} checked={checked} text={text} />
    ) : null
  )) : [];
  
  // Similarly, check if items is an array before mapping over it
  const renderedListCompleted = Array.isArray(items) ? items.map(({ id, text, checked }, index) => (
    checked ? (
      <TodoItem key={id} index={index} id={id} updateItem={updateItem} deleteItem={deleteItem} checked={checked} text={text} />
    ) : null
  )) : [];

  const renderedFilteredList = () => {
    if (selectedFilter === 'active') return renderedListActive;
    else if (selectedFilter === 'completed') return renderedListCompleted;
    else return renderedList;
  };

  const getItemsLeft = () => {
    if (!Array.isArray(items)) return 0; // Return 0 if items is not an array
    let completedItems = items.filter(item => item.checked).length;
    return items.length - completedItems;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const updatedList = Array.from(items);
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);
    updateItems(updatedList);
  };

  return (
    <div className={`todo-list-wrapper`}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul className="list" {...provided.droppableProp} ref={provided.innerRef}>
              { renderedFilteredList() }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="todo-list-footer">
        <span className="items-left">{ getItemsLeft() } items left</span>
        <Filter selectedFilter={selectedFilter} updateFilter={updateFilter}/>
        <button aria-label="Clear Completed" className={`btn-clear`} onClick={() => clearCompleted()}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
