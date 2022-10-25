const apiCall = async() => {

    var users = [];
    
    await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then((data)=>{
        data.map((user)=>{
            users.push({userInfo: user, posts: []});
        })        
    })
    .then(async()=>{
        await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then((data)=>{
            data.map((post)=>{
                //console.log(users[users.findIndex(user => user.userInfo.id === post.userID)].userInfo);
                users[users.findIndex(user => user.userInfo.id === post.userId)].posts.push(post);
            });
        }).then(()=>{
            console.log(users);

            users.map((userObj)=>{
                const row = document.createElement("tr");

                const data = document.createElement("td");

                row.setAttribute("id", userObj.userInfo.id);
    
                data.innerText = userObj.userInfo.name;
    
                row.insertAdjacentElement("afterbegin", data);

                const image = document.createElement("img");

                row.insertAdjacentElement("beforebegin", image);

                row.addEventListener("click", (child)=>{
                    console.log(users[row.id - 1]);

                    document.getElementById("posts-header").innerText = `${users[row.id - 1].userInfo.name}'s Posts:`;

                    if(document.getElementById("posts-node").childElementCount == 0){
                        users[row.id - 1].posts.map((post)=>{

                            const postContainer = document.createElement("div");

                            postContainer.classList.add("post-container");

                            const title = document.createElement("h4");
                            
                            title.innerText = post.title;

                            const body = document.createElement("p");

                            body.innerText = post.body;

                            postContainer.insertAdjacentElement("afterbegin", title);
                            postContainer.insertAdjacentElement("beforeend", body);

                            document.getElementById("posts-node").insertAdjacentElement("afterbegin", postContainer);

                        });
                    }
                    else{
                        var lastChild = document.getElementById("posts-node").lastElementChild;

                        while(lastChild){
                            document.getElementById("posts-node").removeChild(lastChild);
                            lastChild = document.getElementById("posts-node").lastElementChild;
                        }

                        users[row.id - 1].posts.map((post)=>{

                            const postContainer = document.createElement("div");

                            postContainer.classList.add("post-container");

                            const title = document.createElement("h4");
                            
                            title.innerText = post.title;

                            const body = document.createElement("p");

                            body.innerText = post.body;

                            postContainer.insertAdjacentElement("afterbegin", title);
                            postContainer.insertAdjacentElement("beforeend", body);

                            document.getElementById("posts-node").insertAdjacentElement("afterbegin", postContainer);

                        });
                    }

                })
                document.getElementById("table-body").insertAdjacentElement("afterbegin", row);
            })
        })
    })
}

window.addEventListener('load', apiCall);