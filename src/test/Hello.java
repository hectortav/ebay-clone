package test;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@Path("/hello")
public class Hello {
	
	@GET
	@Produces(MediaType.TEXT_XML)
	public String sayHello()
	{
		String resource = ",? xml version='1.0 ?>" + 
		"<hello> This is Hello from XML </hello>";
		return resource;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String sayHelloJASON()
	{
		String resource = null;
		return resource;
	}
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayhelloHTML(@QueryParam("name") String name, @QueryParam("Card_no") String Card_no, @QueryParam("amount") int amount){
		//localhost:8080/RestAPI/rest/hello?name=my_name&Card_no=12345&amount=1000
		System.out.println("Name is " + name);
		System.out.println("Amount is " + amount);
		String response;
		
		if(amount > 10000)
		{
			System.out.println("Amount is Greater than 10.000");
			response = "Credit Card is not approved";
		}
		else
		{
			System.out.println("Amount is Lesser than 10.000");
			response = "Credit Card is approved";
		}
		return "<html>" + "<title>" + "Credit Card Authorization" + name + "</title>" + "<body><h1>" + response + "</h1></body>" + "</html>"; 
	}
}
