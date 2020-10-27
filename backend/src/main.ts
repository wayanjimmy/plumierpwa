import { join } from "path";
import "@plumier/serve-static";
import { ServeStaticFacility } from "@plumier/serve-static";
import Plumier, { WebApiFacility, route, response } from "plumier";

class HelloController {
  @route.get("/")
  @route.historyApiFallback()
  index() {
    return response.file(join(__dirname, "../../frontend/build/index.html"));
  }
}

@route.root("api/user")
class UserController {
  list() {
    const users = [
      {
        name: "jimmy",
        email: "jimmyeatcrab@gmail.com",
      },
    ];

    return users;
  }
}

new Plumier()
  .set(new WebApiFacility({ controller: [HelloController, UserController] }))
  .set(
    new ServeStaticFacility({ root: join(__dirname, "../../frontend/build") })
  )
  .listen(process.env.PORT || 8000);
