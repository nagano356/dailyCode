package getDate;

import java.time.LocalDate;

public class GetDate {

	public static void main(String[] args) {
		System.out.print("The purpose is to check if Class of LocalDate is a server dependent data fetch \n");
		System.out.print("https://docs.oracle.com/javase/jp/8/docs/api/java/time/LocalDate.html\n");
		
		
		GetDate getDateInstance = new GetDate(); //aというインスタンスを生成
		getDateInstance.getDate();
		
	}
	
	private LocalDate systemDate;
	public void getDate()
	{
		systemDate = LocalDate.now();
		System.out.print("LocalDate.now()" + systemDate);
	}
	

}
