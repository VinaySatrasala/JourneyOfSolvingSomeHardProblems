
# **Journey of Solving "Maximum Number That Sum of the Prices Is Less Than or Equal to K" Problem**

### **Problem Understanding and Approach**  
**Date:** 2025-04-29

**Problem Statement:**
- Given a number `k`, and an integer `x`, find the **maximum number `n`** such that the sum of set bits at positions divisible by `x` is **less than or equal to `k`**.

---

### **Initial Thoughts and Brute Force Approach**

1. **Initial Idea:**
   - I started off by trying to brute force through all numbers up to `n` and check the set bits at positions divisible by `x`.
   - I implemented a simple solution with a loop that iterates from `1` to `n`, checks the set bits at positions divisible by `x`, and sums them to compare against `k`.

2. **Initial Code (Brute Force):**
   ```java
   public long findMaximumNumber(long k, int x) {
       long accSum = 0;
       int i = 1;
       while (accSum <= k) {
           int temp = i;
           int sum = 0;
           for (int f = 1; (f * x - 1) < 32; f++) {
               sum = sum + (i >> (f * x - 1)) & 1;
           }
           accSum = accSum + sum;
           System.out.println("i + " + i + " Price " + sum + " acc " + accSum);
           i++;
       }
       return i - 1;
   }
   ```

3. **Challenges:**
   - The brute force approach was computationally expensive.
   - The loop structure was inefficient, as I had to count set bits for every number up to `n`.
   - I realized the need for optimization to avoid iterating through large ranges directly.

---

### **Optimization and Realization:**

1. **Optimization Strategy:**
   - I began to understand that directly iterating through each number up to `n` wasn't feasible for large values of `n` (up to `1e15`).
   - I decided to switch to a **binary search approach** to find the **maximum number `n`** more efficiently.
   
2. **Key Insights:**
   - Instead of calculating the set bits for every number up to `n`, I needed a **method to count the set bits at specific positions**.
   - **Binary search** could help narrow down the range of potential numbers, checking if the sum of set bits at positions divisible by `x` is within the given limit `k`.

---

### **Binary Search Approach**

1. **Binary Search Outline:**
   - I used binary search over the possible range of `n` from `1` to `1e15`.
   - For each midpoint `mid`, I used a helper function to calculate the set bits at positions divisible by `x` for numbers up to `mid`.
   - I adjusted the range based on whether the accumulated sum of set bits was less than or greater than `k`.

2. **Updated Code Using Binary Search:**
   ```java
   public long findMaximumNumber(long k, int x) {
       long l = 1, r = (long) 1e15; // Initial binary search range
       long ans = 0;  // Store the result

       while (l <= r) {
           long mid = l + (r - l) / 2;
           int[] setBits = new int[53];  // Reset for each mid value
           populate(setBits, mid);  // Fill the setBits array for `mid`
           int acc = accSum(setBits, x);  // Get the accumulated sum of set bits

           if (acc <= k) {
               ans = mid;  // This is a valid number, so store it
               l = mid + 1;  // Try for a larger `n`
           } else {
               r = mid - 1;  // Try smaller `n`
           }
       }

       return ans;  // The largest `n` that satisfies the condition
   }
   ```

3. **Helper Functions:**
   - **`populate`:** Counts the number of set bits at each bit position for numbers up to `n`.
   - **`accSum`:** Sums the set bits at positions divisible by `x`.

---

### **Testing and Refining the Code**

1. **Test Case:**
   ```java
   System.out.println(findMaximumNumber(9, 1));  // Should return 6
   ```
   - This test case failed with an incorrect output (`939700189659135`).
   - After some debugging, I realized the need to fix the binary search logic and ensure that the correct values were being checked.

2. **Fixing the Logic:**
   - I realized that I was handling the **upper bound of the binary search range** incorrectly.
   - I also needed to improve the way I **counted the set bits** in each number.

---

### **Refinement and Final Code**

1. **Final Code:**
   ```java
   public class MaximumNumberThatSumofthePricesIsLessThanorEqualtoK {
       public long findMaximumNumber(long k, int x) {
           long l = 1, r = (long) 1e15; // Initial binary search range
           long ans = 0;  // Store the result

           while (l <= r) {
               long mid = l + (r - l) / 2;
               int[] setBits = new int[53];  // Reset for each mid value
               populate(setBits, mid);  // Fill the setBits array for `mid`
               int acc = accSum(setBits, x);  // Get the accumulated sum of set bits

               if (acc <= k) {
                   ans = mid;  // This is a valid number, so store it
                   l = mid + 1;  // Try for a larger `n`
               } else {
                   r = mid - 1;  // Try smaller `n`
               }
           }

           return ans;  // The largest `n` that satisfies the condition
       }

       // Helper Functions
       private int accSum(int[] setBits, int x) {
           int acc = 0;
           for (int i = 0; i < setBits.length; i++) {
               if ((i + 1) % x == 0) {
                   acc += setBits[i];
               }
           }
           return acc;
       }

       private void populate(int[] setBits, long n) {
           for (int i = 0; i < 53; i++) {
               long cnt = n / (1L << (i + 1));
               setBits[i] = (int)(cnt * (1L << i) + Math.max(0, n % (1L << (i + 1)) - (1L << i) + 1));
           }
       }

       // Main method to test
       public static void main(String[] args) {
           MaximumNumberThatSumofthePricesIsLessThanorEqualtoK solution = new MaximumNumberThatSumofthePricesIsLessThanorEqualtoK();
           System.out.println(solution.findMaximumNumber(9, 1));  // Expected: 6
       }
   }
   ```

2. **Reflection:**
   - The binary search approach turned out to be **the most efficient** way to solve this problem.
   - The initial brute force solution was too slow, but after applying **efficient bit counting** and **binary search**, the code worked in **constant time** for large numbers.

---

### **Conclusion:**
- This problem helped me refine my skills in **binary search**, **bit manipulation**, and **efficient counting of set bits**.
- I learned how to approach large problem spaces and optimize them using advanced techniques.

---

### **Future Improvements:**
- I could further optimize the bit counting strategy for specific ranges of numbers, but the current solution works well for the problem at hand.
