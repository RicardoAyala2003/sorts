
function generateArray(size, max = 1000) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }
  

  
  const sizes = [10, 100, 1000, 10000]; 
  const iterations = 10; 
  const results = [];
  
  sizes.forEach((size) => {
    const arr = generateArray(size); 
    const result = { size };
  

    result.insertionSort = measureExecutionTime(insertionSort, arr, iterations);
    result.selectionSort = measureExecutionTime(selectionSort, arr, iterations);
    result.bubbleSort = measureExecutionTime(bubbleSort, arr, iterations);
    result.mergeSort = measureExecutionTime(mergeSort, arr, iterations);
    result.heapSort = measureExecutionTime(heapSort, arr, iterations);
    result.quickSort = measureExecutionTime(quickSort, arr, iterations);
  
    results.push(result);
  });
  
  
  results.forEach((result) => {
    console.log("=".repeat(40));
    console.log(`Tamaño del arreglo: ${result.size}`);
    console.log("-".repeat(40));
    console.log(`Insertion Sort: ${result.insertionSort.toFixed(4)} ms`);
    console.log(`Selection Sort: ${result.selectionSort.toFixed(4)} ms`);
    console.log(`Bubble Sort: ${result.bubbleSort.toFixed(4)} ms`);
    console.log(`Merge Sort: ${result.mergeSort.toFixed(4)} ms`);
    console.log(`Heap Sort: ${result.heapSort.toFixed(4)} ms`);
    console.log(`Quick Sort: ${result.quickSort.toFixed(4)} ms`);
    console.log("=".repeat(40));
  });

  
  //Insertion Sort
  function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
  
  //Selection Sort
  function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  //Bubble Sort
  function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  }
  
  // Merge Sort
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }
  
  function merge(left, right) {
    let result = [];
    let i = 0,
      j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
  //Heap Sort
  function heapSort(arr) {
    let n = arr.length;
  
    function heapify(arr, n, i) {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
      }
    }
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0);
    }
  }
  
  //Quick Sort
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.filter((el) => el < pivot);
    const right = arr.filter((el) => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  

  function measureExecutionTime(sortFunction, arr, iterations = 5) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
      const copy = [...arr]; 
      const start = performance.now();
      sortFunction(copy);
      const end = performance.now();
      totalTime += end - start;
    }
    return totalTime / iterations; 
  }
  
 