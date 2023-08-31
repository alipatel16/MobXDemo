import { observable, action } from "mobx";

class ExpenseStore {
  @observable expenseList = [];

  @action addExpense(itemsObj) {
    this.expenseList.push(itemsObj);
  }

  @action updateExpense(itemId, updatedItem) {
    const index = this.expenseList.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.expenseList[index] = { ...this.expenseList[index], ...updatedItem };
    }
  }

  @action getItemById(itemId) {
    return this.expenseList.find((item) => item.id === itemId);
  }

  @action deleteExpense(itemId) {
    const index = this.expenseList.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.expenseList.splice(index, 1);
    }
  }

  @action getItems() {
    return this.expenseList;
  }
}

const expenseStore = new ExpenseStore();
export default expenseStore;
