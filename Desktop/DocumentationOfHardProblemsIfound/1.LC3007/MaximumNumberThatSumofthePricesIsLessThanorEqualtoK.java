public class MaximumNumberThatSumofthePricesIsLessThanorEqualtoK {
    public long findMaximumNumber(long k, int x) {
        long l = 1, r = (long) 1e15, ans = 0;

        while (l <= r) {
            long mid = l + (r - l) / 2;
            int[] setBits = populate(mid);
            int acc = accSum(setBits, x);

            if (acc <= k) {
                ans = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return ans;
    }

    private int accSum(int[] setBits, int x) {
        int acc = 0;
        for (int i = 0; i < setBits.length; i++) {
            if ((i + 1) % x == 0) {
                acc += setBits[i];
            }
        }
        return acc;
    }

    private int[] populate(long n) {
        int[] setBits = new int[53];
        helper(setBits, n);
        return setBits;
    }

    private void helper(int[] setBits, long n) {
        if (n == 0) return;

        int msb = 63 - Long.numberOfLeadingZeros(n);
        long cn = 1L << msb;

        setBits[msb] += (n - cn + 1);

        for (int i = 0; i < msb; i++) {
            setBits[i] += cn / 2;
        }

        helper(setBits, n - cn);
    }
}
