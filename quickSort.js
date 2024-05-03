// array sorting
const qs = (arr, low, high) => {
  if (low >= high) {
    return;
  }

  const pivotIndex = partition(arr, low, high);

  qs(arr, low, pivotIndex - 1);
  qs(arr, pivotIndex + 1, high);
};

const partition = (arr, low, high) => {
  const pivot = arr[high];

  let index = low - 1;

  for (let i = low; i < high; ++i) {
    if (arr[i] <= pivot) {
      index++;
      [arr[i], arr[index]] = [arr[index], arr[i]];
    }
  }

  index++;
  [arr[high], arr[index]] = [arr[index], arr[high]];

  return index;
};

const quick_sort = (arr) => {
  qs(arr, 0, arr.length - 1);
};

module.exports = quick_sort;
