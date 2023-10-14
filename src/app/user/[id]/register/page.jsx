import FormActa from "@/app/components/FormActa"

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center'>
        <h2 className='leading-10 text-[20px] self-center font-bold'>Ingrese información del Acta</h2>
        <div>
            <FormActa />
        </div>
    </div>
  )
}

export default RegisterPage