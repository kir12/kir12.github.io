public class SelectSort{
  public static void main(String[] args){
    int[] arr = {3,2,5,1,3,7,8,10};
    int temp;
    int origNum;
    int tempNum;
    for(int i = 0; i < arr.length - 1; i++){
      temp = i;
      for(int a = i+1; a< arr.length - 1; a++){
        if(arr[a] < arr[temp]){
          temp = a;
        }
      }
      origNum = arr[i];
      tempNum = arr[temp];
      System.out.println("number to swap:" + origNum);
      System.out.println("least num:" + tempNum);
      arr[i] = tempNum;
      arr[temp] = origNum;
    }
    for(int numba : arr){System.out.println(numba);}
  }
}
