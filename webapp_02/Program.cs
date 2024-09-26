var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseDefaultFiles(); //Added by jackmu


//jackmu - add rewrite - begin
app.Use(async (context, next) =>
{
    var url = context.Request.Path.Value ?? "";
    url = url.ToLower();

    if (url.EndsWith("/employees") || url.EndsWith("/departments") || url.EndsWith("/products"))
    {
        context.Request.Path = "/index.html";
    }

    await next();
});
//jackmu - add rewrite - end


app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
