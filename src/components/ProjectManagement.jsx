import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function ProjectManagement() {
    const [projects, setProjects] = useState([]);
    const [change, setChange] = useState(false);
    
    
    const handleCloseModelButton = (value) => {
    document.getElementById(value).close();
    };

    const handleAddProjectButton = async (e) => {
        e.preventDefault();

        const {title,des,img,liveLink,githubLink} = e.target;

        const newProject = {
            title: title.value,
            des: des.value,
            img: img.value,
            liveLink: liveLink.value,
            githubLink: githubLink.value
          };  
          
          try {
            const result = await axios.post(
              `http://localhost:5000/api/projects`,
              newProject
            );
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product Successfull added",
              showConfirmButton: false,
              timer: 1500
            });
            setChange(!change);
            handleCloseModelButton("my_modal_3");
          } catch (error) {
            if(error?.message === "Network Error"){
              toast.warning("Network connection failed.Check this network");       
            }
            // console.log("error -> ", error);
            let err = error?.response?.data?.non_field_errors[0]
            if(err){
               toast.warning(err)
            }
          }
    
       
      };

      const [formData, setFormData] = useState({
        _id: "",
        title: "",
        des: "",
        img: "",
        liveLink: "",
        githubLink: "",
      }
      );
    
      const [selectedTimeline, setSelectedTimeline] = useState(null);

      const handleOpenDialog = (project, modalName) => {
    
        // console.log({member})
        setSelectedTimeline(project);
        //  console.log(member.user_id)
    
        setFormData({
            _id: project._id,
            title: project.title,
            des: project.des,
            img: project.img,
            liveLink: project.liveLink,
            githubLink: project.githubLink,
        });
    
    
        document.getElementById("edit").showModal();
      };

      const handleDeleteProject = async (id) => {
            const data = { _id: id };
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const result = await axios.delete(
                      "http://localhost:5000/api/projects",
                      { data }
                  );
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your project has been deleted.",
                    icon: "success"
                  });
                  setChange(!change);
                  } catch (error) {
                  console.log("delete member error -> ", error);
                  }
              }
            });
            
        };
        
      const handleUpdateProject = async () => {}

      useEffect(() => {
        const getAllProjects = async () => {
          try {
            const result = await axios.get(
              `http://localhost:5000/api/projects`
            );
            console.log("get projects -> ", result.data);
            setProjects(result.data)
          } catch (error) {
            console.log("get project error -> ", error);
          }
        };
    
        getAllProjects();
      }, [change]);

      const projectLength = projects.length || 0;

    return (
        <div>
          
          <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-black">
           <button
              id="closeBtn"
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-white dark:bg-black text-[#0c01a1] dark:text-[#73e9fe]"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h2 className="font-bold text-2xl text-center my-3 dark:text-[#73e9fe] text-[#0c01a1]">
              Create New Project
            </h2>
          <form onSubmit={handleAddProjectButton}>
            
            <div className="form-control">
              <label className="label" htmlFor="title">
                <span className="label-text dark:text-[#73e9fe] text-[#0c01a1]">
                  Title
                </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                className="input input-bordered bg-slate-200 dark:bg-black"
              />

              <label className="label" htmlFor="des">
                <span className="label-text dark:text-[#73e9fe] text-[#0c01a1]">
                  Description
                </span>
              </label>
              <input
                type="text"
                id="des"
                name="des"
                placeholder="Enter description"
                className="input input-bordered bg-slate-200 dark:bg-black"
              />

              <label className="label" htmlFor="img">
                <span className="label-text dark:text-[#73e9fe] text-[#0c01a1]">
                  Image Url
                </span>
              </label>
              <input
                type="text"
                id="img"
                name="img"
                placeholder="Enter Image url"
                className="input input-bordered bg-slate-200 dark:bg-black"
              />

              <label className="label" htmlFor="liveLink">
                <span className="label-text dark:text-[#73e9fe] text-[#0c01a1]">
                  LiveLink
                </span>
              </label>
              <input
                type="text"
                id="liveLink"
                name="liveLink"
                placeholder="Enter liveLink url"
                className="input input-bordered bg-slate-200 dark:bg-black"
              />

              <label className="label" htmlFor="githubLink">
                <span className="label-text dark:text-[#73e9fe] text-[#0c01a1]">
                  GithubLink
                </span>
              </label>
              <input
                type="text"
                id="githubLink"
                name="githubLink"
                placeholder="Enter githubLink url"
                className="input input-bordered bg-slate-200 dark:bg-black"
              />



            </div>

            <div className="flex justify-center mt-6">
              <button className="border-none outline-none bg-gradient-to-r from-cyan-500 to-[#0c01a1] text-white rounded w-full px-4 py-2" type="submit">Add Project</button>
            </div>


          </form>
        </div>

      </dialog>

        <div className=" py-2 mt-4 ">
          <div className="flex justify-between items-center pb-2">
            <h1 className="text-3xl   pb-2 font-semibold ">
              Projects
            </h1>

            <button className="bg-gradient-to-r from-cyan-500 to-[#0c01a1] text-white  font-bold px-4 py-2 rounded-md"  onClick={() => document.getElementById('my_modal_3').showModal()}>Add Projects</button>
          </div>

          <hr className="w-full h-1 bg-gradient-to-r from-[#0c01a1] to-[#73e9fe] " />
          <p className="text-sm  font-semibold mt-2 text-black dark:text-white ">
            To ensure seamless progress tracking and maintenance of your project, incorporate team members into your project structure. Assign distinct roles to each member to streamline collaboration and enhance accountability throughout the project lifecycle. Add member and explore more.
          </p>
        </div>


        <div>
          {projectLength === 0 && <><div className='flex justify-center items-center gap-2'>
            <IoPeopleSharp className='text-3xl text-[#0c01a1] dark:text-[#73e9fe]' />
            <h2 className='text-xl font-bold  '>  No Project Found, Add Project!</h2>
          </div></>}
        </div>

        {
        projectLength > 0 && (
          <div className="overflow-x-auto shadow-xl rounded w-full ">
            <table className="table">
              {/* head */}
              <thead className=' text-sm text-[#0c01a1] dark:text-[#73e9fe]'>
                <tr className='text-center'>

                  <th>Title</th>
                  <th>Description</th>
                  <th>LiveLink</th>
                  <th>githubLink</th>
                  <th>Edit Member</th>
                  <th>Delete Member</th>

                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  projects?.map(project =>
                    <tr key={project._id} className="text-center">
                      <td>
                        <div className="flex items-center gap-3 ">
                          <div className="avatar">
                            <div className="rounded-full w-8 h-8">
                              <img src={project.img} alt="member image" />
                            </div>
                          </div>
                          <div>
                            {project.title}
                          </div>
                        </div>
                      </td>
                      <td className="">
                        {project.des}
                      </td>
                      <td className="">
                        {project.liveLink}
                      </td>
                      <td className="">
                        {project.githubLink}
                      </td>

                      <th>
                        {/* <Link to= {`/admin/admin/userDetails`} state={user} className="btn btn-accent  p-2 m-2">details</Link> */}
                        {/* <button className="btn btn-neutral px-4  py-2">Edit</button> */}

                        {/** Member edit button and model start */}
                        <button className='btn-ghost'>  </button>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="mx-4" onClick={() => handleOpenDialog(project, "edit")}>
                          <FaRegEdit className="text-xl" />
                        </button>
                        <dialog id="edit" className="modal">
                          <div className="modal-box bg-white dark:bg-black dark:text-[#73e9fe] text-[#2c01a1]">

                            <button id="closeBtn" className="btn btn-sm btn-circle absolute right-2 top-2 bg-white dark:bg-black text-[#2c01a1] dark:text-[#73e9fe]" onClick={() => document.getElementById('edit').close()}>✕</button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Update Project</h2>

                            <form onSubmit={handleUpdateProject}>

                              <div className='form-control'>
                                <label htmlFor="title" className="label">Title</label>
                                <input type="text" id="title" name="title" value={formData.title} className="input input-bordered bg-slate-200 dark:bg-black" placeholder="Enter Title" />
                              </div>

                              <div className='form-control'>
                                <label htmlFor="des" className="label">Description</label>
                                <input type="text" id="des" name="des" value={formData.des} className="input input-bordered bg-slate-200 dark:bg-black" placeholder="Enter Description" />
                              </div>

                              <div className='form-control'>
                                <label htmlFor="img" className="label">Image Url</label>
                                <input type="text" id="des" name="des" value={formData.img} className="input input-bordered bg-slate-200 dark:bg-black" placeholder="Enter Image Url" />
                              </div>

                              <div className='form-control'>
                                <label htmlFor="liveLink" className="label">Live Link</label>
                                <input type="text" id="liveLink" name="liveLink" value={formData.liveLink} className="input input-bordered bg-slate-200 dark:bg-black" placeholder="Enter LiveLink Url" />
                              </div>

                              <div className='form-control'>
                                <label htmlFor="githubLink" className="label">Github Link</label>
                                <input type="text" id="githubLink" name="githubLink" value={formData.githubLink} className="input input-bordered bg-slate-200 dark:bg-black" placeholder="Enter Github Url" />
                              </div>
                              <div className="flex justify-between my-4">
                                <button type="submit" className="text-lg border-none outline-none bg-gradient-to-r from-cyan-500 to-[#2c01a1] text-white rounded w-full px-4 py-3">Update Project</button>
                              </div>
                            </form>
                          </div>
                        </dialog>
                      </th>
                      <th>
                        {/** Member edit button and model end */}
                        <button className="mx-4" onClick={() => handleDeleteProject(project._id)}>
                          <MdDeleteForever className="text-xl " />
                        </button>
                      </th>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>
        )}
        </div>
    );
};

export default ProjectManagement;