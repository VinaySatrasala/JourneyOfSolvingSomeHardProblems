public class FrogJumps {
    public int frogJumpRec(int[] heights, int index) {
        if(index == heights.length - 1) return 0;
    
        int oneStep = Integer.MAX_VALUE;
        if(index + 1 < heights.length) {
            oneStep = frogJumpRec(heights, index + 1) + 
                      Math.abs(heights[index] - heights[index + 1]);
        }
    
        int twoStep = Integer.MAX_VALUE;
        if(index + 2 < heights.length) {
            twoStep = frogJumpRec(heights, index + 2) + 
                      Math.abs(heights[index] - heights[index + 2]);
        }
    
        return Math.min(oneStep, twoStep);
    }
    int[] dp;
    public int frogJumpMem(int[] heights, int index) {
        if(index == heights.length - 1) return 0;
        if(dp[index] != -1) return dp[index];

        int oneStep = Integer.MAX_VALUE;
        if(index + 1 < heights.length) {
            oneStep = frogJumpMem(heights, index + 1) + 
                    Math.abs(heights[index] - heights[index + 1]);
        }

        int twoStep = Integer.MAX_VALUE;
        if(index + 2 < heights.length) {
            twoStep = frogJumpMem(heights, index + 2) + 
                    Math.abs(heights[index] - heights[index + 2]);
        }

        return dp[index] = Math.min(oneStep, twoStep);
    }

    public int frogJumpTab(int[] heights) {
        int n = heights.length;
        int[] dp = new int[n];
        dp[0] = 0;
    
        for(int i = 1; i < n; i++) {
            int oneStep = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);
            int twoStep = Integer.MAX_VALUE;
            if(i > 1) {
                twoStep = dp[i - 2] + Math.abs(heights[i] - heights[i - 2]);
            }
            dp[i] = Math.min(oneStep, twoStep);
        }
    
        return dp[n - 1];
    }
    
    public int frogJumpConstant(int[] heights) {
        int n = heights.length;
        int prev2 = 0;  // dp[i - 2]
        int prev1 = 0;  // dp[i - 1]
    
        for(int i = 1; i < n; i++) {
            int oneStep = prev1 + Math.abs(heights[i] - heights[i - 1]);
            int twoStep = Integer.MAX_VALUE;
            if(i > 1) {
                twoStep = prev2 + Math.abs(heights[i] - heights[i - 2]);
            }
    
            int curr = Math.min(oneStep, twoStep);
            prev2 = prev1;
            prev1 = curr;
        }
    
        return prev1;
    }
    

    
}
