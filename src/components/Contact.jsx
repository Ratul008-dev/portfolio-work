import React from 'react'
import { useForm } from 'react-hook-form'
import { FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import "./Contact.css"

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await fetch("https://portfolio-backend-9sb1.onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Message submitted successfully!')
                reset()
            }
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }
    return (
        <section id='contact'>
            <div className='Contact-form'>
                <h1 className='heading'>Let's Build Something Together</h1>
                <p className='details'>
                    Have an idea, a project in mind, or simply want to talk about technology and development?
                    I’d love to hear from you. Tell me what you're working on, what you need, or where you're stuck — and let's start a conversation.
                </p>
                <form className='Contact-field' onSubmit={handleSubmit(onSubmit)}>

                    {/* Username Input */}
                    <div className="input-group">
                        <input
                            {...register("username", {
                                required: "This field is required",
                                minLength: { value: 3, message: "Min Length is 3" },
                                maxLength: { value: 20, message: "Max Length is 20" }
                            })}
                            type="text"
                            placeholder='Username'
                        />
                        {errors.username && <div className="error-message">{errors.username.message}</div>}
                    </div>

                    {/* Email Input */}
                    <div className="input-group">
                        <input
                            {...register("email", {
                                required: "E-mail is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            placeholder='Email'
                        />
                        {errors.email && <div className="error-message">{errors.email.message}</div>}
                    </div>

                    {/* Textarea Input (Fixed Closing Tag) */}
                    <div className="input-group">
                        <textarea
                            {...register("message", {
                                required: "Please write your words"
                            })}
                            placeholder='Write your message'
                        ></textarea>
                        {errors.message && <div className="error-message">{errors.message.message}</div>}
                    </div>

                    <button type="submit">Submit</button>
                </form>
                <div className="connect-section">
                    <h2 className="connect-heading">Let's Connect</h2>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/ratul-ganguly/" target='_blank' rel='noopener noreferrer' className='social-icon linkedin'><FaLinkedin /></a>
                        <a href="https://github.com/Ratul008-dev" target='_blank' rel='noopener noreferrer' className='social-icon githib'><FaGithub /></a>
                    </div>
                </div>
            </div>
            <a href="#skills" className='return-arrow'><FaArrowUp /></a>
        </section>
        
    )
}

export default Contact
