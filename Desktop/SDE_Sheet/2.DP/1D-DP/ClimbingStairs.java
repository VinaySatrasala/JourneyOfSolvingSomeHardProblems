public class ClimbingStairs{
    // Normal rec
    public int climbStairsRec(int n){
        // you have reachde
        if(n == 0 || n == 1){
            return 1;
        }

        // at every step one or two steps
        int one = climbStairsRec(n-1);
        int two = climbStairsRec(n-2);

        return one + two;
    }

    // memoized
    int[] dp;
    public int climbStairsMem(int n){
        if(n == 0 || n == 1){
            dp[0] = dp[1] = 1;
            return 1;
        }

        if(dp[n] != -1){
            return dp[n];
        }

        int one = climbStairsMem(n-1);
        int two = climbStairsMem(n-2);

        dp[n] = one + two;
        return dp[n];

    }
    // tabulation
    public int climbStairsTabulation(int n){
        // f(n) = f(n-1) + f(n-2)

        dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;

        for(int i=2;i<=n;i++){
            dp[i] = dp[i-1] + dp[i-2]; 
        }
        return dp[n];
    }
    // O(1)
    public int climbStairsConstant(int n){
        // n depends on n - 1 and n - 2
        int prev2 = 1;
        int prev1 = 1;

        for(int i=2;i<=n;i++){
            int curr = prev1 + prev2;

            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    public static void main(String[] args) {
        
    }


}